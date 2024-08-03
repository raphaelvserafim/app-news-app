import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { COLORS } from '@/constants/theme';

export function Header(props: { title: string; setSearchVisible: (arg0: boolean) => void; searchVisible: any; }) {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="menu" color={COLORS.colorWhite} onPress={() => { }} />
      <Appbar.Content title={props?.title} color={COLORS.colorWhite} style={styles.headerContent} />
      <Appbar.Action icon="magnify" color={COLORS.colorWhite} onPress={() => props?.setSearchVisible(!props.searchVisible)} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: COLORS.header,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
