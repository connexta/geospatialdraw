/// <reference types="react" />
import './fonts.css';
declare type Story = () => any;
declare const withTheme: (story: Story) => JSX.Element;
export default withTheme;
