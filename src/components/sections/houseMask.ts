/**
 * The house from the brand graphic elements, encoded as a CSS mask.
 *
 * Used to cut the hero footage into the house silhouette. The shot is parents
 * forming a roof with their arms, so the gesture lands inside the roof of the
 * mask — the concept and the footage are doing the same thing.
 *
 * Fully percent-encoded, including the angle brackets: this string ends up in
 * an inline style attribute, so any raw markup characters would be HTML
 * escaped before CSS ever sees them.
 *
 * `preserveAspectRatio='none'` means the mask stretches to whatever box it is
 * given, so the container must hold the shape's own 125:130 ratio to avoid
 * distorting it.
 */
export const HOUSE_MASK = `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20125%20130'%20preserveAspectRatio='none'%3E%3Cpath%20d='M125%2062.4009V124.8C125%20126.179%20124.451%20127.502%20123.474%20128.477C122.498%20129.452%20121.173%20130%20119.792%20130H5.20839C3.82706%20130%202.5023%20129.452%201.52555%20128.477C0.548799%20127.502%206.54523e-05%20126.179%206.54523e-05%20124.8V62.4009C-0.00480896%2061.0336%200.262621%2059.679%200.786806%2058.4159C1.31099%2057.1527%202.08147%2056.0062%203.05345%2055.043L55.1367%203.04364C57.09%201.09476%2059.7385%200%2062.5%200C65.2615%200%2067.91%201.09476%2069.8633%203.04364L121.947%2055.043C122.919%2056.0062%20123.689%2057.1527%20124.213%2058.4159C124.737%2059.679%20125.005%2061.0336%20125%2062.4009Z'%20fill='white'/%3E%3C/svg%3E")`;
