import dynamic from 'next/dynamic';
const Tooltip = dynamic(() => import('./Tooltip'), { loading: () => <div></div>, ssr: true });
export default Tooltip;