import React from 'react'
import { View, Text , TouchableOpacity, FlatList} from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({ name, activeTabText, onPressHandle }) => (
  <TouchableOpacity style={styles.btn(name, activeTabText)} onPress={onPressHandle}>
    <Text style={styles.btnText(name, activeTabText)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({item, index}) => (
          <TabButton
            name={item}
            activeTabText={tabs[activeTab]}
            onPressHandle={() => setActiveTab(index)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        scrollEnabled={false}
      />
    </View>
  )
}

export default Tabs