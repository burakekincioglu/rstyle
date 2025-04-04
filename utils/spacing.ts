/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
  export const spacing = {
    none   : 0,
    xxxs   : 2,
    xxs    : 4,
    xs     : 8,
    sm     : 12,
    md     : 16,
    semiL : 20,
    l     : 24,
    xl     : 32,
    xxl    : 48,
    xxxl   : 64,
    xxxxl  : 76,
    xxxxxl : 100
  } as const
  
  export type Spacing = keyof typeof spacing