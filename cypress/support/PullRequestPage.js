class PullRequestPage {
    visit() {
      cy.visit('https://github.com/');
    }

    PullRequestTab(){
     return cy.get('[data-content="Pull requests"]');
    }

    PullreqNewbutton(){

      return cy.contains('New pull request');
    }

    HeadBranch(){
       return cy.get('#head-ref-selector > .btn');
    }

    selectBranch(){
      return cy.xpath("//span[contains(text(), 'api_automation_tests')]");
    }

    viewPullRequestButton(){
      return cy.contains('View pull request');
    }

    ReqDescriptionbox(){

      return cy.xpath("//div[contains(@class, 'comment-body markdown-body')]");
    }

    NewCommentButton(){
      return cy.get('#new_comment_field');
    }

    CommentButton(){
    return  cy.xpath("//button[normalize-space(text())='Comment']");
    } 

    CommentList(){
      return cy.xpath("//td[contains(@class, 'd-block comment-body markdown-body')]");
    }

    MergeRequest(){
      return cy.contains('Merge pull request');
    }

    CancelMerge() {
      return cy.xpath("//button[contains(text(), 'Cancel')]");
    }

    ConfirmMerge() {
      return cy.xpath("//button[contains(text(), 'Confirm merge')]");
    }
 }
  
  module.exports = PullRequestPage;