import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { IOtherProject, IPrivatePadProp } from '../../launchpad/PrivatePadDataList'
import { useMemo, useState } from 'react'
import useBreakpoint from 'hooks/useBreakpoint'

interface ISwitchTab {
  tab: string[]
  renderEl: JSX.Element[]
}
const Container = styled(Box)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 24px;
  margin-top: -100px;
`
const ItemCardStyle = styled(Box)`
  width: 100%;
  padding: 20px 48px;
  background: #fff;
  border-radius: 24px 24px 0px 0px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0;
    border-radius: 0px;
  }
`
const InfoBoxStyle = styled(Box)`
  width: 100%;
  padding: 80px 40px 120px 40px;
  border-radius: 30px;
  background: var(--grey-06, #f6f6f3);
  min-height: 500px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 24px;
    min-height: 200px;
    border-radius: 16px;
  }
  & p,
  & a {
    font-size: 16px;
  }
`
const BtnTitle = styled(Typography)`
  color: var(--black-100, #959595);

  /* D/H5 */
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 13px;
  }
`
const TabBtnStyle = styled(Button)`
  padding: 16px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  &.second.active {
    background: #e1f25c;
    & > .text {
      color: #121212;
      font-weight: 600;
    }
  }
  &.second:hover {
    cursor: pointer;
    border: 1px solid #e1f25c;
    color: #121212;
    border-radius: 8px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    &.first.active {
      background: #fff;
      border-radius: 8px 8px 0 0;
      & > .text {
        color: #20201e;
        font-weight: 600;
        font-size: 14px;
      }
    }
    &.second.active {
      border: none;
      border-radius: 0px;
      border-bottom: 2px solid var(--yellow, #e1f25c);
      background: transparent;
      font-size: 13px;
      & > .text {
        font-weight: 500;
        color: #121212;
      }
    }
  }
`
const TabBtnContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: max-content;
  overflow: scroll;
  ${({ theme }) => theme.breakpoints.down('md')} {
    &.first {
      background: transparent;
    }
    &.second {
      border-bottom: 1px solid var(--black-6, rgba(18, 18, 18, 0.06));
    }

    background: var(--white-100, #fff);
  }
`
type Level = 'first' | 'second'
const CardSwitch = ({ tab, renderEl, level }: ISwitchTab & { level: Level }) => {
  const [curTab, setCurTab] = useState(0)
  const isMd = useBreakpoint('md')
  return (
    <Stack gap={isMd ? 0 : 24} sx={{ width: '100%' }}>
      <TabBtnContainer className={level}>
        {tab.map((i, d) => (
          <TabBtnStyle key={i} onClick={() => setCurTab(d)} className={`${level} ${curTab === d ? 'active' : ''}`}>
            <BtnTitle className="text">{i}</BtnTitle>
          </TabBtnStyle>
        ))}
      </TabBtnContainer>

      {renderEl[curTab]}
    </Stack>
  )
}
const OtherProjectTab = ({ item }: { item: IPrivatePadProp }) => {
  const isMd = useBreakpoint('md')
  const otherProject = item.otherProject as IOtherProject[]
  const firstLevelTitles = useMemo(() => otherProject?.map(i => i.title), [otherProject])

  const secondLevel: ISwitchTab[] = useMemo(() => {
    return otherProject?.map(it => {
      return {
        tab: it.tabList.map(i => i.title),
        renderEl: it.tabList.map(i => (
          <Box sx={{ padding: isMd ? '24px 16px' : 0 }} key={i.title}>
            <InfoBoxStyle>{i.info}</InfoBoxStyle>
          </Box>
        ))
      }
    })
  }, [isMd, otherProject])

  const secondLevelRender = useMemo(
    () =>
      secondLevel.map((i, d) => (
        <ItemCardStyle key={d}>
          <CardSwitch level="second" tab={i.tab} renderEl={i.renderEl} />
        </ItemCardStyle>
      )),
    [secondLevel]
  )

  const firstLevel: ISwitchTab[] = useMemo(() => {
    return [
      {
        tab: firstLevelTitles,
        renderEl: secondLevelRender
      }
    ]
  }, [firstLevelTitles, secondLevelRender])

  const firstLevelRender = useMemo(() => {
    return firstLevel.map((i, d) => <CardSwitch level="first" key={d} tab={i.tab} renderEl={i.renderEl} />)
  }, [firstLevel])
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}>
        {isMd ? firstLevelRender : secondLevelRender}
      </Box>
    </Container>
  )
}
export default OtherProjectTab
