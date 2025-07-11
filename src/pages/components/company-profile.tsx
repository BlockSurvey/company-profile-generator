import { useBearStore } from '@/stores/zustand.store';

export default function CompanyProfile() {
  const { bears, increase, reset } = useBearStore();

  const returnSubComponent = () => {
    return <>Bears {bears}</>;
  };

  return (
    <>
      <h1>Zustand</h1>
      Bears {bears}
      <button
        type="button"
        onClick={() => {
          increase(1);
        }}
      >
        Increase
      </button>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </>
  );
}
