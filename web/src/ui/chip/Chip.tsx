import { ReactNode, useMemo } from 'react';
import { getRandomNoBetweenAndIncluding } from 'src/utils/math';

export enum ColorVariant {
    BLUE = 0,
    GRAY = 1,
    RED = 2,
    GREEN = 3,
    YELLOW = 4,
    INDIGO = 5,
    PURPLE = 6,
    PINK = 7,
}

const VARIANT_MAPS: Record<ColorVariant, string> = {
    [ColorVariant.BLUE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ColorVariant.GRAY]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    [ColorVariant.RED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    [ColorVariant.GREEN]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [ColorVariant.YELLOW]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [ColorVariant.INDIGO]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    [ColorVariant.PURPLE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    [ColorVariant.PINK]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};

const getRandomVariant = () => {
    const values = Object.values(ColorVariant);
    const max = values.length / 2 - 1
    const min = 0
    const randomIndex = getRandomNoBetweenAndIncluding(min, max)
    return randomIndex
};

interface Props {
    children?: ReactNode;
    variant?: ColorVariant;
    onClick?: () => void
}

const Chip = ({ variant, children, onClick }: Props) => {

    const selectedVariant = useMemo(() => variant || getRandomVariant(), []);
    const colorClasses = VARIANT_MAPS[selectedVariant]
    const spanClassName = `inline-flex items-center px-2 py-1 mr-2 text-sm font-medium rounded`
    const finalSpanClassName = `${spanClassName} ${colorClasses}`

    return (
      <button onClick={onClick} className={finalSpanClassName}>
        {children}
      </button>
    );
};
  
export { Chip };
