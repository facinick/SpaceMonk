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

const SPAN_VARIANT_MAPS: Record<ColorVariant, string> = {
    [ColorVariant.BLUE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ColorVariant.GRAY]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    [ColorVariant.RED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    [ColorVariant.GREEN]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [ColorVariant.YELLOW]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [ColorVariant.INDIGO]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    [ColorVariant.PURPLE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    [ColorVariant.PINK]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};


const BUTTON_VARIANT_MAPS: Record<ColorVariant, string> = {
    [ColorVariant.BLUE]: 'hover:bg-blue-200 text-blue-400 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300',
    [ColorVariant.GRAY]: 'hover:bg-gray-200 text-gray-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300',
    [ColorVariant.RED]: 'hover:bg-red-200 text-red-400 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300',
    [ColorVariant.GREEN]: 'hover:bg-green-200 text-green-400 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300',
    [ColorVariant.YELLOW]: 'hover:bg-yellow-200 text-yellow-400 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300',
    [ColorVariant.INDIGO]: 'hover:bg-indigo-200 text-indigo-400 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300',
    [ColorVariant.PURPLE]: 'hover:bg-purple-200 text-purple-400 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300',
    [ColorVariant.PINK]: 'hover:bg-purple-200 text-purple-400 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300',
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

const AddableChip = ({ variant, children, onClick }: Props) => {

    const selectedVariant = useMemo(() => variant || getRandomVariant(), []);

    const spanColorClasses = SPAN_VARIANT_MAPS[selectedVariant]
    const buttonColorClasses = BUTTON_VARIANT_MAPS[selectedVariant]
    const spanClassName = `inline-flex items-center px-2 py-1 mr-2 text-sm font-medium rounded`
    const buttonClassName = `inline-flex items-center p-1 ml-2 text-sm bg-transparent rounded-sm`;

    const finalSpanClassName = `${spanClassName} ${spanColorClasses}`
    const finalbuttonClassName = `${buttonClassName} ${buttonColorClasses}`

    return (
        <span className={finalSpanClassName}>
            {children}
            <button onClick={onClick} type="button" className={finalbuttonClassName} aria-label="Add">
                <svg
                    className="w-2 h-2 transform rotate-45"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span className="sr-only">Add badge</span>
            </button>
        </span>
    );
};

export { AddableChip };
