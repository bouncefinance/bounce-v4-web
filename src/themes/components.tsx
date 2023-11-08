import inputOptions from './options/input'
import { ReactComponent as ArrowSVG } from 'assets/imgs/components/arrow.svg'
// import CheckedSVG from 'assets/imgs/components/checked.svg'
import { CommonColors } from '@mui/material/styles/createPalette'
import React, { HTMLProps, useCallback } from 'react'
import MuiCloseIcon from '@mui/icons-material/Close'
import { Link, IconButton, keyframes, styled, Theme, useTheme } from '@mui/material'
import { SxProps } from '@mui/system'

export function CloseIcon({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      size="large"
      sx={{
        padding: 0,
        position: 'absolute',
        top: '24px',
        right: '24px',
        '&:hover $closeIcon': {
          color: theme => theme.palette.text.primary
        }
      }}
    >
      <MuiCloseIcon sx={{ color: theme => theme.palette.grey[500] }} />
    </IconButton>
  )
}

export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  style,
  sx,
  className,
  children,
  underline
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
  href: string
  style?: React.CSSProperties
  sx?: SxProps<Theme>
  underline?: 'always' | 'hover' | 'none'
  className?: string
}) {
  const theme = useTheme()
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
      } else {
        event.preventDefault()
        window.location.href = href
      }
    },
    [href, target]
  )
  return (
    <Link
      className={className}
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      style={style}
      color={theme.palette.common.black}
      sx={sx}
      underline={underline ?? 'none'}
    >
      {children}
    </Link>
  )
}

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

export const AnimatedWrapper = styled('div')(`
pointer-events: none;
display: flex;
align-items: center;
justify-content: center;
height: 100%;
width: 100%;
`)

export const AnimatedImg = styled('div')(`
animation: ${pulse} 800ms linear infinite;
& > * {
  width: 72px;
})
`)

export const Dots = styled('span')(`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`)

const buildVar = function (name: string) {
  const NAMESPACE = '--ps-'
  return `${NAMESPACE}${name}`
}

export const ComponentOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => {
        const common = theme.palette.common
        const vars = Object.keys(common).reduce((prev: any, next) => {
          prev[buildVar(next)] = common[next as unknown as keyof CommonColors]
          return prev
        }, {})

        return {
          html: {
            ...vars,
            '*: hover': {
              transition: '0.3s'
            },
            '& .PSans': {
              fontFamily: 'Public Sans'
            }
          },
          body: {
            fontFamily: `"Sharp Grotesk DB Cyr Book 20"`,
            fontSize: 14,
            color: common.text,
            background: '#F6F7F3'
          },
          a: {
            textDecoration: 'none',
            color: 'inherit'
          },
          picture: { display: 'inline-flex' },
          input: {
            '&::placeholder': {},
            '&:-webkit-autofill, &:-webkit-autofill:focus': {
              transition: 'background-color 600000s 0s, color 600000s 0s'
            }
          }
        }
      }
    },
    ...inputOptions,

    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
        disableGutters: true
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiFormLabel-root + div': {
            'textarea.MuiOutlinedInput-input': {
              paddingTop: '0px!important'
            },
            '.MuiOutlinedInput-input': {
              paddingTop: '18px!important',
              paddingBottom: '0px!important'
            }
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'var(--ps-text)',
          '& .MuiInputBase-root': {
            marginTop: 0
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: 14,
          lineHeight: '20px',
          transition:
            'background-color 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:disabled': {
            // border: '1px solid var(--ps-text-5)',
            background: 'var(--ps-text-5)',
            color: 'var(--ps-white)'
          },
          '&:hover': {
            background: 'var(--ps-yellow-1)'
            // border: '1px solid var(--ps-yellow-1)'
          },
          '&:active': {
            background: 'var(--ps-yellow-1)',
            // border: '1px solid var(--ps-yellow-1)',
            color: 'var(--ps-primary)'
          }
        },
        sizeLarge: {
          height: 72,
          borderRadius: 8
        },
        sizeMedium: {
          height: 60,
          borderRadius: 8
        },
        sizeSmall: {
          height: 36,
          borderRadius: 8
        },
        textPrimary: {
          // background: 'var(--ps-gray-50)',
          color: '#000000',
          '&:hover': {
            background: 'var(--ps-yellow-1)'
          },
          '&:active': {
            background: 'var(--ps-yellow-1)',
            color: '#000000'
          }
        },
        containedPrimary: {
          background: 'var(--ps-yellow-1)',
          color: 'var(--ps-text-3)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            background: 'var(--ps-gray-900)',
            borderColor: 'var(--ps-yellow-1)',
            color: 'var(--ps-white)'
          },
          '&:active': {
            background: 'var(--ps-gray-900)',
            color: 'var(--ps-white)'
          },
          '&:disabled': {
            border: '1px solid var(--ps-text-5)',
            background: 'var(--ps-text-5)',
            color: 'var(--ps-white)'
          }
        },
        outlinedPrimary: {
          border: '1px solid var(--ps-gray-20)',
          background: 'var(--ps-primary)',
          color: 'var(--ps-gray-900)',
          '&:hover': {
            background: 'var(--ps-yellow-1)',
            border: '1px solid var(--ps-yellow-1)'
          },
          '&:active': {
            background: 'var(--ps-yellow-1)',
            border: '1px solid var(--ps-yellow-1)',
            color: 'var(--ps-primary)'
          },
          '&:disabled': {
            border: '1px solid var(--ps-text-5)',
            background: 'var(--ps-text-5)',
            color: 'var(--ps-white)'
          }
        },
        containedSecondary: {
          background: 'var(--ps-gray-900)',
          color: 'var(--ps-white)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            background: 'var(--ps-yellow-1)',
            color: 'var(--ps-text-3)'
          }
        },
        outlinedSecondary: {
          border: '1px solid var(--ps-gray-20)',
          backgroundColor: 'var(--ps-white)',
          '&:hover': {
            border: '1px solid var(--ps-yellow-1)',
            backgroundColor: 'var(--ps-white)'
          },
          '&:active': {
            border: '1px solid var(--ps-yellow-1)',
            backgroundColor: 'var(--ps-white)'
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowSVG,
        MenuProps: {
          PaperProps: {
            sx: {
              marginTop: 16,
              border: '1px solid #E4E4E4',
              borderRadius: 20,
              maxHeight: 350,
              boxShadow: 'none',
              '&:focus': {
                border: '1px solid var(--ps-yellow-1)'
              },
              '& .MuiMenu-list .MuiListSubheader-sticky': {
                color: '#878A8E',
                fontSize: 12,
                lineHeight: 20 / 12,
                marginTop: 10,
                marginBottom: 10
              }
            }
          },
          MenuListProps: {
            sx: {
              padding: '6px !important',
              '& .MuiMenuItem-root.Mui-selected': {
                justifyContent: 'space-between',
                color: '#121212',
                borderRadius: 100,
                background: 'var(--ps-yellow-1)',
                // '&::after': {
                //   content: `' '`,
                //   width: 20,
                //   height: 20,
                //   background: `url(${CheckedSVG}) no-repeat center`
                // },
                '&:hover': {}
              },
              '& .MuiMenuItem-root:hover': {
                color: 'var(--ps-yellow-1)',
                background: 'transparent'
              }
            }
          }
        }
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: 'var(--ps-white)',
          border: 0,
          fieldset: { borderColor: 'var(--ps-text-8)' },
          '&:before': {
            border: 0
          },
          '&:after': {
            border: 0
          },
          '&:hover, &:active, &:focus': {
            background: 'var(--ps-text-8)',
            border: '1px solid var(--ps-yellow-1)',
            fieldset: { borderColor: 'unset !important', borderWidth: 0, border: 0 },
            '&:not(.Mui-disabled):before': {
              border: 'none'
            }
          },
          '&.Mui-focused': {
            background: 'var(--ps-white)',
            border: '1px solide var(--ps-yellow-1)',
            fieldset: { borderColor: 'var(--ps-yellow-1) !important', borderWidth: 'unset !impoartant' }
          },
          '&.Mui-disabled': {
            background: 'var(--ps-white)'
          }
        },
        select: {
          '&:focus': {
            background: 'none'
          }
        },
        icon: {
          right: 14
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#000000',
          borderRadius: 5,
          padding: '7px 10px',
          '&.Mui-checked': {
            color: '#2663FF'
          }
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPagination-ul': {
            // alignItems: 'baseline'
          },
          ' .MuiPagination-ul>li:not(:first-of-type):not(:last-child) .MuiPaginationItem-root': {
            border: 0,
            color: 'var(--ps-text-3)',
            fontFamily: `'Inter'`,
            fontWight: 400,
            fontSize: 16,
            '&.Mui-selected': {
              color: 'var(--ps-text-3)',
              background: 'var(--ps-yellow-1)'
            },
            '&:hover': {
              backgroundColor: 'var(--ps-text-1)',
              color: '#fff'
            }
          },

          '& .MuiPaginationItem-root': {
            height: 32,
            borderRadius: 6,
            width: 32,
            margin: '0 12px'
          }
        }
      }
    }
  }
} as any

export default ComponentOptions
