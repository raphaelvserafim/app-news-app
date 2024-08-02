import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { COLORS } from '@/constants/theme';

export function Header(props: { setSearchVisible: (arg0: boolean) => void; searchVisible: any; }) {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="menu" color="#fff" onPress={() => { }} />
      <Appbar.Content title="Name" color="#fff" style={styles.headerContent} />
      <Appbar.Action icon="magnify" color="#fff" onPress={() => props?.setSearchVisible(!props.searchVisible)} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: COLORS.header,
    color: "#fff"
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
