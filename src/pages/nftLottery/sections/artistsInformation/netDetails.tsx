import { Box, Typography } from '@mui/material'
import Title from '../../components/artistsInformation/Title'
import Text from '../../components/artistsInformation/Text'
import useBreakpoint from 'hooks/useBreakpoint'

interface Deatail {
  name: string
  value: string
}

interface List extends Deatail {
  subTab?: Deatail[]
}

export const DeatailList: List[] = [
  // { name: 'Hard Cap', value: '4200000 USD' },
  // { name: 'Total Token Supply', value: '600000000 GMT' },
  // { name: 'Initial Circulating Supply', value: '10% of Total Token SUPPLY' },
  // {
  //   name: 'Public Sale Token Price',
  //   value: '0.01 USD ( price in BNB will be determined prior to the start of subscription)'
  // },
  // { name: 'Tokens Offered', value: '4200000000 GMT' },
  // {
  //   name: 'Hard Cap Per User',
  //   value: '15000 USD ( price in BNB will be determined prior to the start of subscription)'
  // },
  // {
  //   name: 'Token Sale Vesting Period',
  //   value: '15000 USD ( price in BNB will be determined prior to the start of subscription)'
  // },
  // { name: 'Hard Cap Per User', value: 'No lockup' },
  { name: 'Contract Address', value: 'TBD' },
  { name: 'Token Standard', value: 'BRC-721,ERC-721' },
  { name: 'Blockchain', value: 'Bitcoin, Ethereum' }
  // { name: 'Token Distribution', value: 'After the end of token sale' }
]

const NetDetails = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box marginBottom={isSm ? '24px' : '0'}>
      {!isSm && <Title text="NFT DETAILS" />}
      <Typography
        variant="lotteryh2"
        color={'var(--AI-dark-02, #4C483A)'}
        textTransform={'uppercase'}
        fontWeight={700}
        borderBottom={'1px solid #858780'}
        fontSize={isSm ? 18 : 24}
        lineHeight={isSm ? '130%' : '90%'}
        padding={isSm ? '24px 0 16px' : '40px 0'}
      >
        NFT SALE AND ECONOMICS PARAMETERS AND PUBLIC TIME, ETC.
      </Typography>
      {DeatailList.map(({ name, value }, idx) => (
        <Box
          key={idx}
          gap={isSm ? 4 : 0}
          sx={{
            display: 'flex',
            flexDirection: isSm ? 'column' : 'row',
            alignItems: isSm ? 'flex-start' : 'center',
            padding: isSm ? '16px 0 12px' : '16px 0',
            borderBottom: '1px solid #858780'
          }}
        >
          <Text style={{ width: isSm ? '100%' : '280px' }}>{name}</Text>
          <Text color={'var(--AI-dark-01, var(--AI-black-02, #3D3A32))'} style={{ flex: '1' }}>
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
export default NetDetails
