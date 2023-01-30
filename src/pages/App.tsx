import { Grid } from '@nextui-org/react'
import { useAtomValue } from 'jotai'
import { useAtomDevtools } from 'jotai/devtools'
import React, { memo } from 'react'

import type { ValidSerchQuery } from '../atom'
import { subscribedAtom } from '../atom'
import DiscussionCommentsTimeline from '../components/DiscussionCommentsTimeline'
import IssueCommentsTimeline from '../components/IssueCommentsTimeline'
import RootContainer from '../components/layouts/RootContainer'
import SidebarSection from '../components/layouts/SidebarSection'
import Sidebar from '../components/Sidebar'

const App: React.FC = memo(() => {
  const subscribed = useAtomValue(subscribedAtom)
  useAtomDevtools(subscribedAtom)
  return (
    <RootContainer>
      <SidebarSection>
        <Sidebar />
      </SidebarSection>
      <Grid.Container gap={0.6} as="main" wrap="nowrap" css={{ h: '100%' }}>
        {subscribed.length ? (
          subscribed.map(
            (
              { username, issueComments, discussionComments }: ValidSerchQuery,
              i
            ) => {
              return (
                <Grid xs={2.5} key={i}>
                  {issueComments && !discussionComments && (
                    <IssueCommentsTimeline user={username} />
                  )}
                  {!issueComments && discussionComments && (
                    <DiscussionCommentsTimeline user={username} />
                  )}
                </Grid>
              )
            }
          )
        ) : (
          <></>
        )}
      </Grid.Container>
    </RootContainer>
  )
})
App.displayName = 'App'

export default App
