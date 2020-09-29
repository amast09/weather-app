export enum AsyncRequestKinds {
  NotStarted = "NotStarted",
  Loading = "Loading",
  Completed = "Completed",
  Failed = "Failed",
}

interface NotStarted {
  readonly kind: AsyncRequestKinds.NotStarted;
}

interface Loading {
  readonly kind: AsyncRequestKinds.Loading;
}

interface Completed<R> {
  readonly kind: AsyncRequestKinds.Completed;
  readonly result: R;
}

interface Failed<E> {
  readonly kind: AsyncRequestKinds.Failed;
  readonly error: E;
}

type AsyncRequest<R = void, E = void> =
  | Completed<R>
  | Failed<E>
  | Loading
  | NotStarted;

export function AsyncRequestNotStarted<R, E = void>(): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.NotStarted,
  };
}

export function AsyncRequestLoading<R, E = void>(): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Loading,
  };
}

export function AsyncRequestFailed<R, E = void>(error: E): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Failed,
    error,
  };
}

export function AsyncRequestCompleted<R, E = void>(
  result: R
): AsyncRequest<R, E> {
  return {
    kind: AsyncRequestKinds.Completed,
    result,
  };
}

export default AsyncRequest;
