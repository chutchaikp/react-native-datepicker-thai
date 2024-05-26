// Example how to optimize flatlist
// More info https://reactnative.dev/docs/optimizing-flatlist-configuration

import { memo } from 'react';

const [list, setList] = useState([]);
const [loading, setLoading] = useState(false);
const cellRefs = useRef([]);

const Hello = memo(() => {
  // Main
  useEffect(() => {
    _getData();
  }, []);

  const _createData = () => {
    const data = [];
    for (let index = 0; index < 5; index += 1) {
      data.push({
        id: uuidv4(),
        username: `username-${Math.floor(Math.random() * 1000)}`,
      });
    }
    return data;
  };

  const _getData = () => {
    setLoading(true);

    const reponse = _createData();

    setTimeout(() => {
      setList([...list, ...reponse]);
      setLoading(false);
    }, 1000);
  };

  const _onViewableItemsChanged = React.useRef(({ changed }) => {
    changed.forEach((item) => {
      const cell = cellRefs.current[item.key];
      if (cell) {
        if (item.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const _viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });

  const _renderItem = useCallback(
    ({ item }) => (
      <Post
        data={item}
        ref={(ref) => {
          cellRefs.current[item.id] = ref;
        }}
      />
    ),
    []
  );

  const _keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <FlatList
      data={list}
      initialNumToRender={2}
      maxToRenderPerBatch={1}
      windowSize={5}
      onEndReachedThreshold={0.9}
      removeClippedSubviews
      onViewableItemsChanged={_onViewableItemsChanged.current}
      viewabilityConfig={_viewConfigRef.current}
      keyExtractor={_keyExtractor}
      onEndReached={_getData}
      showsVerticalScrollIndicator={false}
      snapToInterval={Dimensions.get('window').height}
      snapToAlignment="start"
      decelerationRate="fast"
      renderItem={_renderItem}
      ListFooterComponent={_footerIndicator}
    />
  );
});

export default Hello;
