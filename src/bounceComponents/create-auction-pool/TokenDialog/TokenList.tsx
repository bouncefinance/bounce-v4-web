import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ListItemAvatar, Typography } from '@mui/material'
import { show } from '@ebay/nice-modal-react'
import Image from 'components/Image'

import DangerousTokenDialog from '../DangerousTokenDialog'
import ErrorSVG from 'assets/imgs/icon/error_filled.svg'
import TokenImage from 'bounceComponents/common/TokenImage'
import { Token } from 'bounceComponents/fixed-swap/type'
import BigNumber from 'bignumber.js'

function ItemRender(
  listChildComponentProps: ListChildComponentProps<(Token & { balance?: number })[]>,
  onOk: (tokne: Token) => void,
  onCancel: () => void
) {
  const { data, index, style } = listChildComponentProps

  const showDangerousTokenDialog = (seletedToken: Token) => {
    show(DangerousTokenDialog, seletedToken)
      .then(() => {
        onOk(seletedToken)
      })
      .catch(err => {
        console.log('Rejected: ', err)
        onCancel()
      })
  }

  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      secondaryAction={data?.[index].dangerous ? <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" /> : null}
    >
      <ListItemButton
        sx={{ borderRadius: '25px' }}
        onClick={() => {
          if (data[index].dangerous) {
            showDangerousTokenDialog(data?.[index])
          } else {
            onOk(data?.[index])
          }
        }}
      >
        <ListItemAvatar>
          <TokenImage alt={data?.[index]?.name} src={data?.[index].logoURI} size={32} />
        </ListItemAvatar>
        <ListItemText
          sx={{ my: 0 }}
          primary={
            <Typography component="span" variant="h4" color="text.primary" sx={{ lineHeight: 1 }}>
              {data?.[index]?.symbol}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1, opacity: 0.5 }}>
              {data?.[index]?.name}
            </Typography>
          }
        />
        <Box>{BigNumber(data?.[index]?.balance?.toFixed(4) || 0).toNumber()}</Box>
      </ListItemButton>
    </ListItem>
  )
}

interface TokenListProps {
  data: Token[]
  onOk: (tokne: Token) => void
  onCancel: () => void
}

const TokenList = ({ data, onOk, onCancel }: TokenListProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        '&>.size-list': {
          width: { md: 656 }
        }
      }}
    >
      {/* TODO: Auto width */}
      <FixedSizeList
        className="size-list"
        height={300}
        width={'auto'}
        itemSize={50}
        itemCount={data.length}
        overscanCount={8}
        itemData={data}
      >
        {listChildComponentProps => {
          return ItemRender(listChildComponentProps, onOk, onCancel)
        }}
      </FixedSizeList>
    </Box>
  )
}

export default TokenList
