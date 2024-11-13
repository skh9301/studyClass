import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ProtallProps {
    children: ReactNode;
}

export const Protal: FC<ProtallProps> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};
