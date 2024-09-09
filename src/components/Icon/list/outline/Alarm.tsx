import { forwardRef, Ref, SVGProps } from 'react';

const SvgAlarm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v5l3 2" />
    <circle cx={12} cy={13} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M16.803 2A12.046 12.046 0 0 1 22 6.364M7.197 2A12.047 12.047 0 0 0 2 6.364"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21 22-2.243-3M3 22l2.243-3"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgAlarm);
export default ForwardRef;
