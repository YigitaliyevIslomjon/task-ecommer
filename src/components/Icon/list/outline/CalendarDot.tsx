import { forwardRef, Ref, SVGProps } from 'react';

const SvgCalendarDot = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M3 7.5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4V18a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7.5Z"
    />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M3 9h18" />
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 2v3m8-3v3" />
    <circle cx={12} cy={15} r={1} fill="currentColor" />
    <circle cx={16} cy={15} r={1} fill="currentColor" />
    <circle cx={8} cy={15} r={1} fill="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgCalendarDot);
export default ForwardRef;
