import { forwardRef, Ref, SVGProps } from 'react';

const SvgBriefcaseTriangular = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path
      fill="currentColor"
      d="M2 10a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-8Z"
      opacity={0.4}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11 2.75A2.25 2.25 0 0 0 8.75 5v2a.75.75 0 0 1-1.5 0V5A3.75 3.75 0 0 1 11 1.25h2A3.75 3.75 0 0 1 16.75 5v2a.75.75 0 0 1-1.5 0V5A2.25 2.25 0 0 0 13 2.75h-2Z"
      clipRule="evenodd"
      opacity={0.4}
    />
    <path fill="currentColor" d="M18 6H6a4 4 0 0 0-4 4v1s6.095 4 10 4c3.905 0 10-4 10-4v-1a4 4 0 0 0-4-4Z" />
    <path fill="currentColor" d="M14 15a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  </svg>
);
const ForwardRef = forwardRef(SvgBriefcaseTriangular);
export default ForwardRef;
