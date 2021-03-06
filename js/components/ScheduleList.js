import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faHeart} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {FavesContext} from '../context';
import {Wrapper, SpaceBetween, TextGrey} from '../Style';

Icon.loadFont();

const ScheduleList = ({data, navigation}) => {
  const [sessions, setSessions] = useState([]);
  const newData = [];
  const {isFave} = useContext(FavesContext);
  // console.log(navigation.state.routeName);
  useEffect(() => {
    if (data) {
      const getTime = data.map(session => {
        return session.startTime;
      });
      const time = getTime.filter(
        (item, index) => getTime.indexOf(item) === index,
      );
      time.map(startTime => {
        let sessionsForTime = data.filter(session => {
          return session.startTime === startTime;
        });
        newData.push({
          title: startTime,
          data: sessionsForTime,
        });
      });
    }
    setSessions(newData);
  }, [data]);

  return (
    <View>
      <SectionList
        style={{backgroundColor: '#fff'}}
        sections={sessions}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate('Session', {
                item: item,
                // isFave: isFave(item.id),
              })
            }>
            <Text style={styles.item}>{item.title}</Text>
            <SpaceBetween style={{padding: 10}}>
              <TextGrey>{item.location}</TextGrey>
              {isFave(item.id) ? (
                <Icon
                  name="ios-heart"
                  size={20}
                  color="#dd3333"
                  style={{alignSelf: 'flex-end'}}
                />
              ) : null}
            </SpaceBetween>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 44,
    fontFamily: 'Montserrat-Regular',
  },
});

export default ScheduleList;
