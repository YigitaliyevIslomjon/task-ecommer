import { forwardRef, Ref, SVGProps } from 'react';

const SvgDirectionUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m17 14-5-4-5 4" />
  </svg>
);
const ForwardRef = forwardRef(SvgDirectionUp);
export default ForwardRef;
