import { forwardRef, useId } from 'react';
import { classes } from '../../utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      version="1.1"
      aria-hidden
      className={classes(styles.monogram, className)}
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path
            d="M 4.180 7.250 C 4.380 8.656, 5.303 9.615, 6.642 9.805 C 8.066 10.008, 8.655 10.678, 8.398 11.805 C 8.186 12.737, 9.125 14.844, 10.483 16.487 C 12.739 19.215, 13.092 19.337, 14.540 17.889 C 15.988 16.441, 15.895 16.029, 13.474 13.151 L 10.822 10 14.411 10 L 18 10 18 15 L 18 20 12.628 20 L 7.257 20 6.797 27.750 C 6.526 32.322, 5.628 36.862, 4.606 38.822 C 3.251 41.421, 3.132 42.454, 4.060 43.572 C 4.712 44.357, 5.584 45, 5.999 45 C 7.386 45, 10.760 35.569, 11.456 29.750 L 12.144 24 28.572 24 C 44.333 24, 45 23.919, 45 22 C 45 20.205, 44.333 20, 38.500 20 L 32 20 32 15 C 32 10.111, 32.067 10, 35 10 C 38.501 10, 38.782 10.983, 36 13.500 C 33.790 15.500, 33.422 17.525, 35.081 18.550 C 36.642 19.515, 42.197 13.863, 41.670 11.847 C 41.399 10.811, 41.951 9.985, 43.116 9.680 C 44.205 9.395, 45 8.303, 45 7.094 C 45 5.037, 44.640 5, 24.430 5 L 3.861 5 4.180 7.250 M 22 15 C 22 19.667, 22.167 20, 24.500 20 C 26.833 20, 27 19.667, 27 15 C 27 10.333, 26.833 10, 24.500 10 C 22.167 10, 22 10.333, 22 15"
            stroke="none"
            fill="#fcfcfc"
            fillRule="evenodd"
          />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
