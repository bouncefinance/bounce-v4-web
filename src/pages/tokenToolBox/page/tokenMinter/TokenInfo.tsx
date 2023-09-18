import { Box, styled } from '@mui/material'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { ContainerBox } from '../tokenlocker/tokenLocker'
import { Body01, H4, H6 } from '../../../../components/Text'
import { BoxSpaceBetween } from '../disperse/disperse'
import Grid2 from '@mui/material/Unstable_Grid2'
import { ReactComponent as EmptyBox } from 'assets/imgs/toolBox/empty-box.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useTokenInfo } from '../../../../bounceHooks/toolbox/useTokenInfo'
import useChainConfigInBackend from '../../../../bounceHooks/web3/useChainConfigInBackend'
import { routes } from '../../../../constants/routes'
import { Currency, CurrencyAmount } from '../../../../constants/token'
import { ChainId } from '../../../../constants/chain'
import { TokenInfo as TokenInfoData } from '../../../../api/toolbox/type'

export default function TokenInfo() {
  const { chain, token } = useParams()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chain || '')
  const { data } = useTokenInfo(chainConfigInBackend?.id || 0, token)
  const nav = useNavigate()

  function getAmount(record: TokenInfoData | undefined) {
    return CurrencyAmount.fromRawAmount(
      new Currency(ChainId.SEPOLIA, record?.contract || '', record?.decimals || 18),
      record?.supply || '0'
    )
  }

  return (
    <Box>
      <ContainerBox>
        <BackButton />
        <Box
          sx={{
            borderRadius: '25px',
            background: '#fff',
            padding: '56px'
          }}
        >
          <LineBg>
            <GrayBg>
              <H4>Token Information</H4>
              <WhiteBg>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Contract address</Body01>
                  <Body01>{data?.token}</Body01>
                </BottomLineBox>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Balance</Body01>
                  <Body01>{getAmount(data).toSignificant()}</Body01>
                </BottomLineBox>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Chain</Body01>
                  <Body01>{chainConfigInBackend?.chainName}</Body01>
                </BottomLineBox>
                {/*<FullSpaceBetweenBox>*/}
                {/*  <Body01 sx={{ color: '#959595' }}>Token image</Body01>*/}
                {/*  <img style={{ width: 24, height: 24 }} />*/}
                {/*</FullSpaceBetweenBox>*/}
              </WhiteBg>
              {/*<SolidBtn style={{ width: '100%' }}>Transfer</SolidBtn>*/}
            </GrayBg>
            <Grid2 container sx={{ width: '100%' }} columnSpacing={20}>
              <Grid2 md={6}>
                <GrayBg>
                  <BoxSpaceBetween width={'100%'}>
                    <H4>Token Locked</H4>
                    <SolidBtnSmall
                      onClick={() => {
                        data &&
                          nav(`${routes.tokenToolBox.tokenLocker}?chain=${data?.chain_id}&tokenAddr=${data?.token}`)
                      }}
                    >
                      + Lock
                    </SolidBtnSmall>
                  </BoxSpaceBetween>
                  <EmptyBg>
                    <EmptyBox />
                    <H6 mt={10}>No data</H6>
                  </EmptyBg>
                </GrayBg>
              </Grid2>
              <Grid2 md={6}>
                <GrayBg>
                  <BoxSpaceBetween width={'100%'}>
                    <H4>Token Disperse</H4>
                    <SolidBtnSmall
                      onClick={() => {
                        data && nav(`${routes.tokenToolBox.disperse}?disperseType=token&tokenAddr=${data?.token}`)
                      }}
                    >
                      + Disperse
                    </SolidBtnSmall>
                  </BoxSpaceBetween>
                  <EmptyBg>
                    <EmptyBox />
                    <H6 mt={10}>No data</H6>
                  </EmptyBg>
                </GrayBg>
              </Grid2>
            </Grid2>
          </LineBg>
        </Box>
      </ContainerBox>
    </Box>
  )
}

const LineBg = styled(Box)`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid var(--grey-05, #e8e9e4);
`
export const GrayBg = styled(Box)`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--grey-06, #f6f6f3);
`
export const WhiteBg = styled(Box)`
  display: flex;
  padding: 12px 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  background: var(--white-100, #fff);
`
export const FullSpaceBetweenBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
`
export const BottomLineBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid var(--grey-05, #e8e9e4);
`
const SolidBtnSmall = styled(`button`)`
  color: white;
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  border: transparent;
  background: var(--black-100, #121212);
`
const EmptyBg = styled(WhiteBg)`
  padding: 32px 24px;
  justify-content: center;
  align-items: center;
`
