import { forwardRef, Ref, SVGProps } from 'react';

const SvgDirectionDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m7 10 5 4 5-4" />
  </svg>
);
const ForwardRef = forwardRef(SvgDirectionDown);
export default ForwardRef;
