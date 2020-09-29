const getLocation = (navigator: Navigator): Promise<Position> => {
  return new Promise<Position>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        resolve(position);
      },
      () => {
        reject();
      }
    );
  });
};

export default getLocation;
