import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveArticleToUser, increaseIndex, decreaseIndex } from '../actions.js'
import countryNames from '../countryNames.js'
import swal from 'sweetalert'

class NewsModal extends Component {
  constructor(props){
    super(props)

    this.state = {
      counter: Number(this.props.indexCounter)
     }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  saveNews = (article, userID) => {
    this.props.saveArticleToUser(article, userID, countryNames)
    swal("Article Saved!", "Check User Profile To View", "success")
  }

  loginNotification = () => {
    swal("Please Login or SignUp To Save Articles");
  }

  nextArticle = () => {
    this.props.increaseIndex()
  }

  prevArticle = () => {
    if (this.props.indexCounter > 0){
      this.props.decreaseIndex()
    }
  }

  countryNews = () => {
    return (
      <div>

        <Modal dimmer={this.state.dimmer} open={this.props.isOpen} onClose={this.props.close}>

            <Modal.Header>

              {this.props.newsStories.articles && this.props.newsStories.articles.length > 0 ? this.props.newsStories.articles[this.props.indexCounter].title : null}

            </Modal.Header>

            <Modal.Content image>

                <Image wrapped size='medium' src={this.props.newsStories.articles && this.props.newsStories.articles.length > 0 ? this.props.newsStories.articles[this.props.indexCounter].urlToImage : null} />

              <Modal.Description>

                <Header>

                  {this.props.newsStories.articles && this.props.newsStories.articles.length > 0 ? this.props.newsStories.articles[this.props.indexCounter].description : null}

                </Header>

                  <p>{this.props.newsStories.articles && this.props.newsStories.articles.length > 0 ? this.props.newsStories.articles[this.props.indexCounter].content : null}</p>

              </Modal.Description>

            </Modal.Content>

            <Modal.Actions>

              {this.props.indexCounter > 0 ?

                <Button animated onClick={this.prevArticle} floated="left">
                  <Button.Content visible>Previous Article</Button.Content>
                  <Button.Content hidden>
                  <Icon name='arrow left' />
                  </Button.Content>
                </Button>

              : null }

              {this.props.newsStories.articles && this.props.newsStories.articles.length > 0 && this.props.indexCounter < this.props.newsStories.articles.length -1 ?

                <Button animated onClick={this.nextArticle} floated="left">
                  <Button.Content visible>Next Article</Button.Content>
                  <Button.Content hidden>
                  <Icon name='arrow right' />
                  </Button.Content>
                </Button>

              : null }

              { this.props.newsStories.articles && this.props.newsStories.articles.length > 0 && this.props.user.user ?

                <Button
                  negative
                  icon='heart outline'
                  labelPosition='right'
                  content="Save"
                  onClick={() => this.saveNews(this.props.newsStories.articles[this.props.indexCounter], this.props.user.user.id) }/>

              :

                <Button
                  negative
                  icon='heart outline'
                  labelPosition='right'
                  content="Save"
                  onClick={() => this.loginNotification()}/>

              }



              <a target="_blank" href={this.props.newsStories.articles && this.props.newsStories.articles.length > 0 ? this.props.newsStories.articles[this.props.indexCounter].url : null}>

                <Button
                  positive
                  icon='internet explorer'
                  labelPosition='right'
                  content="Open Article In Browser"
                  onClick={this.close} />

              </a>

          </Modal.Actions>
        </Modal>
      </div>
    )
  }

  searchNews = () => {
    if (this.props.filteredNews.articles && this.props.filteredNews.articles.length > 0){

      return (

        <div>

          <Modal dimmer={this.state.dimmer} open={this.props.isOpen} onClose={this.props.close}>

            <Modal.Header>
              {this.props.filteredNews.articles[this.props.indexCounter].title}
            </Modal.Header>

            <Modal.Content image>
              <Image wrapped size='medium' src={this.props.filteredNews.articles[this.props.indexCounter].urlToImage} />

              <Modal.Description>

                <Header>
                 {this.props.filteredNews.articles[this.props.indexCounter].description}
                </Header>

                  <p>{this.props.filteredNews.articles[this.props.indexCounter].content}</p>

              </Modal.Description>

            </Modal.Content>

            <Modal.Actions>

              {this.props.indexCounter > 0 ?

                <Button animated onClick={this.prevArticle} floated="left">
                  <Button.Content visible>Previous Article</Button.Content>
                  <Button.Content hidden>
                  <Icon name='arrow left' />
                  </Button.Content>
                </Button>

              : null }

              {this.props.indexCounter < this.props.filteredNews.articles.length -1 ?

                <Button animated onClick={this.nextArticle} floated="left">
                  <Button.Content visible>Next Article</Button.Content>
                  <Button.Content hidden>
                  <Icon name='arrow right' />
                  </Button.Content>
                </Button>

              : null }

              { this.props.user.user ?

                <Button
                  negative
                  icon='heart outline'
                  labelPosition='right'
                  content="Save"
                  onClick={() => this.saveNews(this.props.filteredNews.articles[this.props.indexCounter], this.props.user.user.id, countryNames[this.props.selectCountry])} />

              :

                <Button
                  negative
                  icon='heart outline'
                  labelPosition='right'
                  content="Save"
                  onClick={() => swal("Please Login To Save", "failure")} />

                }

              <a target="_blank" href={this.props.filteredNews.articles[this.props.indexCounter].url}>

                <Button
                  positive
                  icon='internet explorer'
                  labelPosition='right'
                  content="Open Article In Browser"
                  onClick={this.close} />

              </a>

            </Modal.Actions>
          </Modal>
        </div>
      )
    }
  }

  render() {

    return (
      <div>
        { this.props.newsToDisplay === 'country' ? this.countryNews() : this.searchNews() }
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    selectedCountry: state.country.selectedCountry,
    newsStories: state.news.newsStories,
    user: state.user,
    indexCounter: Number(state.news.indexCounter),
    newsToDisplay: state.news.newsToDisplay,
    filteredNews: state.news.filteredSearch
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveArticleToUser: (article, userId) => dispatch(saveArticleToUser(article, userId) ),
    increaseIndex: () => dispatch(increaseIndex() ),
    decreaseIndex: () => dispatch(decreaseIndex() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsModal)
