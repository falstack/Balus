import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import UnreadCommentList from '~/components/ListView/UnreadCommentList'
import UnreadAgreeList from '~/components/ListView/UnreadAgreeList'
import UnreadRewardList from '~/components/ListView/UnreadRewardList'
import UnreadUserFollowList from '~/components/ListView/UnreadUserFollowList'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.$router.params.type
    })
  }

  render () {
    const name = this.$router.params.type
    if (!name) {
      return
    }

    return <View className='scroll-page'>
      <View className='scroll-wrap'>
        {
          name === '评论'
            ? <UnreadCommentList />
            : name === '点赞'
              ? <UnreadAgreeList />
              : name === '投食'
                ? <UnreadRewardList />
                : <UnreadUserFollowList />
        }
      </View>
    </View>
  }
}
