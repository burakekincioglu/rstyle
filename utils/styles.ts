import { type TextStyle, type ViewStyle } from 'react-native/types'

export const FLEX1: ViewStyle = { flex: 1 }
export const FDROW: ViewStyle = { flexDirection: 'row' }
export const FDCOLUMN: ViewStyle = { flexDirection: 'column' }

export const AICENTER: ViewStyle = { alignItems: 'center' }
export const AISTART: ViewStyle = { alignSelf: 'flex-start' }
export const ASEND: ViewStyle = { alignSelf: 'flex-end' }
export const ASCENTER: ViewStyle = { alignSelf: 'center' }
export const ACCENTER: ViewStyle = { alignContent: 'center' }


export const JCENTER: ViewStyle = { justifyContent: 'center' }
export const FLEXSTART: ViewStyle = { justifyContent: 'flex-start' }
export const FLEXEND: ViewStyle = { justifyContent: 'flex-end' }
export const SPACEBTW: ViewStyle = { justifyContent: 'space-between' }

export const TACENTER: TextStyle = { textAlign: 'center' }

export const CENTER_ITEMS: ViewStyle = { alignItems: "center", justifyContent: 'center'}


export const Z_INDEX: ViewStyle = { zIndex: 1 }
export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export const FontW400: TextStyle = { fontWeight: '400' }
export const FontW700: TextStyle = { fontWeight: '700' }

export const FLEXGROW1: ViewStyle = { flexGrow: 1 }
export const UNDERLINE: TextStyle = { textDecorationLine: 'underline' }
export const FLEXWRAP: ViewStyle = { flexWrap: 'wrap' }