import { forwardRef, Ref, SVGProps } from 'react';

const SvgUser = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ref={ref} {...props}>
    <ellipse cx={12} cy={17} fill="currentColor" opacity={0.4} rx={7} ry={4} />
    <circle cx={12} cy={7} r={4} fill="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgUser);
export default ForwardRef;
