'use client';

import { Button } from '@ui/components';
import { useExampleStore } from 'stores/useStore';
import { useGetMainDisplayInfo } from 'hooks/query/displayQuery';

export default function Example() {
  const { count, updateExample, parameterExample, payloadExample } = useExampleStore((state) => state);

  const handleUpdateExample = () => {
    updateExample();
  };

  const handleParameterExample = (count: number) => {
    parameterExample(count);
  };

  const handlePayloadExample = ({ count }: { count: number }) => {
    payloadExample({ count });
  };

  // or

  // const handlePayloadExample = (payload: { count: number }) => {
  //   payloadExample({ count: payload.count });
  // };

  const { data } = useGetMainDisplayInfo();

  return (
    <>
      <div>
        <h1>Example</h1>
        <p>Count: {count}</p>
        <Button
          title='Update Example'
          onClick={handleUpdateExample}
        />
        <Button
          title='Parameters Example'
          onClick={() => handleParameterExample(100)}
        />
        <Button
          title='Payload Example'
          onClick={() => handlePayloadExample({ count: 5000 })}
        />
      </div>
      <ul>{data?.deviceTypeEnumList?.map(({ code, codeName }) => <li key={code}>{codeName}</li>)}</ul>
    </>
  );
}
