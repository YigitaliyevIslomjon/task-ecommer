import { forwardRef, Ref, SVGProps } from 'react';

const SvgGmail = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <rect width={20} height={18} x={2} y={3} stroke="currentColor" strokeWidth={1.5} rx={4} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m2 7 7.501 6.001a4 4 0 0 0 4.998 0L22 7"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgGmail);
export default ForwardRef;
