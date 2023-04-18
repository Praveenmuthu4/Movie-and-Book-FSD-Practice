import { Counter } from './Counter';

export function Welcome({ n, p }) {
    return (
        <div className='card'>
            <img src={p} alt='dp' />
            <h1>
                Hi , {n}
            </h1>
            <Counter />
        </div>
    );
}
