import { Box, styled, Typography, Grid, Stack } from '@mui/material'
import { Params } from 'ahooks/lib/usePagination/types'
import { usePagination } from 'ahooks'
import { getUserTokenList } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import { Token } from 'bounceComponents/fixed-swap/type'
import Image from 'components/Image'

const ContarnerBox = styled(Box)`
  display: flex;
  padding: 48px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 20px;
  background: var(--white-100, #fff);
`
const DividingLine = styled(Box)`
  width: 100%;
  height: 1px;
  opacity: 0.7;
  background: #d4d6cf;
  margin: 16px 0;
`
const TabelRow = styled(Grid)`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: var(--grey-06, #f6f6f3);
`
export default function Account() {
  const { chainId } = useActiveWeb3React()
  const options = useOptionDatas()

  const { data: invitationList }: { data?: Token[] } = usePagination<any, Params>(
    async ({}) => {
      const backedChainId = options.chainInfoOpt?.find(i => i.ethChainId === chainId)?.id
      if (!backedChainId) return
      const params: { chainId: number; action: 1 | 2 } = {
        chainId: backedChainId,
        action: 1
      }
      const resp = await getUserTokenList(params)
      return resp.data as Token[]
    },
    {
      debounceWait: 500,
      refreshDeps: []
    }
  )
  console.log('invitationList', invitationList)

  return (
    <ContarnerBox>
      <Typography fontSize={28} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
        My wallet
      </Typography>
      <Grid mt={40} container>
        <Grid item xs={4}>
          <Typography fontSize={13} fontWeight={400} fontFamily={'Inter'} color="#908E96">
            Assets
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={13} fontWeight={400} fontFamily={'Inter'} color="#908E96">
            Amount
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={13} fontWeight={400} fontFamily={'Inter'} color="#908E96">
            Value
          </Typography>
        </Grid>
      </Grid>
      <DividingLine />
      {invitationList?.map((item, index) => (
        <TabelRow key={index + Math.random()} container>
          <Grid item xs={4}>
            <Stack direction={'row'} gap={10} alignItems={'center'}>
              <Image src={item.logoURI ? item.logoURI : ''} alt=""></Image>
              <Typography fontSize={16} fontWeight={400} fontFamily={'Inter'} color="#121212">
                {item.name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={16} fontWeight={400} fontFamily={'Inter'} color="#121212">
              {item.balance}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontSize={16} fontWeight={400} fontFamily={'Inter'} color="#121212">
              -
            </Typography>
          </Grid>
        </TabelRow>
      ))}
    </ContarnerBox>
  )
}
