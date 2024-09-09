import { forwardRef, Ref, SVGProps } from 'react';

const SvgArrowDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8 14 4 4m0 0 4-4m-4 4V6"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgArrowDown);
export default ForwardRef;
