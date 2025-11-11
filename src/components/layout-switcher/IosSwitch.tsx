import { styled, Switch, type SwitchProps } from "@mui/material";

const IosSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
      width: 36,
      height: 22,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: 'var(--color-primary)',
            opacity: 1,
            border: 0,
            ...theme.applyStyles('dark', {
              backgroundColor: '#2ECA45',
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[600],
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.7,
          ...theme.applyStyles('dark', {
            opacity: 0.3,
          }),
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#FFF6E6',
        opacity: 1,
        border:'1px solid #e5e5e5',
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
        ...theme.applyStyles('dark', {
          backgroundColor: '#39393D',
        }),
      },
    }));

    export default IosSwitch;