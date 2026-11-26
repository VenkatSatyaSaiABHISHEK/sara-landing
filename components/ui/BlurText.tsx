'use client';

/* Adapted from React Bits (https://reactbits.dev/text-animations/blur-text) */
import { motion, MotionConfig, type Easing, type MotionStyle, type Transition } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Snapshot = Record<string, string | number>;
type Keyframes = Record<string, Array<string | number>>;
type Phase = 'from' | 'in' | 'out' | 'rest';

export type BlurTextEffect = 'blur' | 'zoom' | 'tilt' | 'focus' | 'drift';
export type BlurTextStaggerFrom = 'start' | 'center' | 'end' | 'random';
export type BlurTextTrigger = 'view' | 'load' | 'hover' | 'click';

type BlurTextProps = {
  text?: string;
  as?: 'p' | 'h1' | 'h2' | 'span' | 'div';
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  blur?: number;
  distance?: number;
  effect?: BlurTextEffect;
  staggerFrom?: BlurTextStaggerFrom;
  trigger?: BlurTextTrigger;
  color?: string;
  fromColor?: string;
  focusOnHover?: boolean;
};

interface EffectConfig {
  from: Snapshot;
  steps: Snapshot[];
  exit: Snapshot;
  times: number[];
  fade: Easing;
  bounce: number | null;
  settle: number;
  origin?: { originX: number; originY: number };
  exitEase: Easing;
}

interface Piece {
  word: number;
  content: string;
  key: string;
}

const AXES: Record<NonNullable<BlurTextProps['direction']>, ['x' | 'y', number]> = {
  top: ['y', -1],
  bottom: ['y', 1],
  left: ['x', -1],
  right: ['x', 1],
};

const EASE_OUT: Easing = [0.33, 1, 0.68, 1];
const EASE_IN_OUT: Easing = [0.65, 0, 0.35, 1];
const EASE_IN: Easing = [0.55, 0, 0.9, 0.45];
const CSS_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MOVE_KEYS = ['x', 'y', 'scale', 'rotateX', 'rotateY', 'skewX'];
const INSTANT: Transition = { duration: 0 };

const blurTo = (px: number) => `blur(${Math.max(0, px)}px)`;

const buildEffect = (
  effect: BlurTextEffect,
  direction: NonNullable<BlurTextProps['direction']>,
  blur: number,
  distance: number
): EffectConfig => {
  const [axis, sign] = AXES[direction] || AXES.top;
  const b = Math.max(0, blur);
  const d = distance;

  if (effect === 'focus') {
    const soft: Snapshot = { filter: blurTo(b * 1.2), opacity: 0.35, scale: 1.04 };
    return {
      from: soft,
      steps: [
        { filter: blurTo(b * 0.1), opacity: 0.96, scale: 0.998 },
        { filter: blurTo(0), opacity: 1, scale: 1 },
      ],
      exit: soft,
      times: [0, 0.72, 1],
      fade: EASE_IN_OUT,
      bounce: null,
      settle: 1,
      exitEase: EASE_IN_OUT,
    };
  }

  return {
    from: { filter: blurTo(b), opacity: 0, [axis]: sign * d },
    steps: [
      { filter: blurTo(b / 2), opacity: 0.55, [axis]: (-sign * d) / 10 },
      { filter: blurTo(0), opacity: 1, [axis]: 0 },
    ],
    exit: { filter: blurTo(b), opacity: 0, [axis]: -sign * d * 0.6 },
    times: [0, 0.5, 1],
    fade: EASE_OUT,
    bounce: 0.25,
    settle: 0.5,
    exitEase: EASE_IN,
  };
};

const buildKeyframes = (from: Snapshot, steps: Snapshot[]): Keyframes => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const buildRanks = (count: number, staggerFrom: BlurTextStaggerFrom): number[] => {
  const ranks = Array.from({ length: count }, (_, i) => i);
  if (staggerFrom === 'end') return ranks.map((i) => count - 1 - i);
  if (staggerFrom === 'center') {
    const mid = (count - 1) / 2;
    const offset = count % 2 === 0 ? 0.5 : 0;
    return ranks.map((i) => Math.abs(i - mid) - offset);
  }
  return ranks;
};

const startPhase = (trigger: BlurTextTrigger): Phase =>
  trigger === 'load' ? 'in' : trigger === 'hover' || trigger === 'click' ? 'rest' : 'from';

const BlurText = ({
  text = '',
  as = 'span',
  delay = 80,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing,
  onAnimationComplete,
  stepDuration = 0.32,
  blur = 8,
  distance = 22,
  effect = 'blur',
  staggerFrom = 'start',
  trigger = 'load',
  color,
  fromColor,
  focusOnHover = false,
}: BlurTextProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>(() => startPhase(trigger));
  const [firstPhase] = useState<Phase>(() => startPhase(trigger));
  const [focusWord, setFocusWord] = useState(-1);
  const completeRef = useRef(onAnimationComplete);
  useEffect(() => {
    completeRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  const fx = useMemo(() => buildEffect(effect, direction, blur, distance), [effect, direction, blur, distance]);

  const custom = Boolean(animationFrom || animationTo || easing);
  const fromSnapshot = animationFrom ?? fx.from;
  const toSnapshots = animationTo ?? fx.steps;
  const exitSnapshot = animationFrom ?? fx.exit;
  const restSnapshot = toSnapshots[toSnapshots.length - 1];
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, custom ? toSnapshots : [restSnapshot]),
    [fromSnapshot, toSnapshots, restSnapshot, custom]
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = animationTo
    ? Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))
    : fx.times;
  const stagger = Math.max(0, delay) / 1000;

  const words = useMemo(() => text.split(' '), [text]);

  const pieces = useMemo<Piece[]>(() => {
    const list: Piece[] = [];
    words.forEach((word, w) => {
      const isLast = w === words.length - 1;
      if (animateBy === 'words') {
        list.push({ word: w, content: isLast ? word : `${word}\u00A0`, key: `word-${w}` });
        return;
      }
      Array.from(word).forEach((char, c) => list.push({ word: w, content: char, key: `char-${w}-${c}` }));
      if (!isLast) list.push({ word: w, content: '\u00A0', key: `space-${w}` });
    });
    return list;
  }, [words, animateBy]);

  const groups = useMemo(() => {
    const list: number[][] = words.map(() => []);
    pieces.forEach((piece, index) => list[piece.word].push(index));
    return list;
  }, [words, pieces]);

  const ranks = useMemo(() => buildRanks(pieces.length, staggerFrom), [pieces.length, staggerFrom]);
  const maxRank = ranks.reduce((max, rank) => Math.max(max, rank), 0);
  const inTotal = (totalDuration * (custom ? 1 : Math.max(1, fx.settle * 2.2)) + maxRank * stagger) * 1000;

  useEffect(() => {
    if (phase !== 'from' || trigger === 'load') return undefined;
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((current) => (current === 'from' ? 'in' : current));
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [phase, trigger, threshold, rootMargin]);

  useEffect(() => {
    let timer = 0;
    if (phase === 'in') {
      timer = window.setTimeout(() => {
        completeRef.current?.();
      }, inTotal);
    }
    return () => window.clearTimeout(timer);
  }, [phase, inTotal]);

  const inTransition = (rank: number): Transition => {
    const delayed = rank * stagger;
    if (custom) return { duration: totalDuration, times, delay: delayed, ease: easing ?? 'linear' };
    const transition: Record<string, unknown> = { duration: totalDuration, delay: delayed, ease: fx.fade };
    if (fx.bounce === null) return transition as Transition;
    const move = { type: 'spring', visualDuration: totalDuration * fx.settle, bounce: fx.bounce, delay: delayed };
    MOVE_KEYS.forEach((key) => {
      if (key in fromSnapshot) transition[key] = move;
    });
    return transition as Transition;
  };

  const target =
    phase === 'in' ? animateKeyframes : phase === 'out' ? exitSnapshot : phase === 'rest' ? restSnapshot : fromSnapshot;
  const tinted = Boolean(fromColor) && (phase === 'from' || phase === 'out');
  const dim = Math.min(6, Math.max(2, blur * 0.3));
  const pieceStyle: MotionStyle | undefined = fx.origin && !custom ? fx.origin : undefined;

  const renderPiece = (index: number): ReactNode => {
    const piece = pieces[index];
    const rank = ranks[index];
    const transition: Transition = phase === 'in' ? inTransition(rank) : INSTANT;
    const style: MotionStyle | undefined = fromColor
      ? {
          ...pieceStyle,
          color: tinted ? fromColor : undefined,
          transition: phase === 'in' ? `color ${totalDuration * 0.9}s ${CSS_EASE} ${rank * stagger}s` : 'none',
        }
      : pieceStyle;

    return (
      <motion.span
        aria-hidden="true"
        key={piece.key}
        className="inline-block will-change-[transform,filter,opacity]"
        style={style}
        initial={firstPhase === 'rest' ? false : fromSnapshot}
        animate={target}
        transition={transition}
      >
        {piece.content}
      </motion.span>
    );
  };

  const wordStyle = (w: number): CSSProperties | undefined => {
    if (!focusOnHover) return undefined;
    const dimmed = focusWord !== -1 && focusWord !== w;
    return {
      filter: dimmed ? `blur(${dim}px)` : 'blur(0px)',
      opacity: dimmed ? 0.3 : 1,
      transition: `filter 0.45s ${CSS_EASE}, opacity 0.45s ${CSS_EASE}`,
    };
  };

  const Tag = as;

  return (
    <MotionConfig reducedMotion="user">
      <Tag
        ref={ref as React.RefObject<never>}
        className={`inline-flex flex-wrap ${className}`}
        style={{ color }}
      >
        <span className="sr-only select-none">{text}</span>
        {groups.map((indices, w) => (
          <span
            key={`word-${w}`}
            className="inline-flex"
            style={wordStyle(w)}
            onPointerEnter={focusOnHover ? () => setFocusWord(w) : undefined}
            onPointerLeave={focusOnHover ? () => setFocusWord(-1) : undefined}
          >
            {indices.map(renderPiece)}
          </span>
        ))}
      </Tag>
    </MotionConfig>
  );
};

export default BlurText;
