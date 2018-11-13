// https://docs.cypress.io/api/introduction/api.html

describe('My Shot Test', () => {
  it('Visits the Home Page', () => {
    const list = ["active-deliver.html", "active-handin.html", "active-lookfor.html", "active-mine.html", "active-nullify.html", "active-pickup.html", "active-surplus.html", "approval-admit.html", "approval.html", "beneficiary-change-details.html", "beneficiary-change.html", "birthday-reminder.html", "blank.html", "card-active-detail.html", "cardLimit.html", "company-content.html", "company-credit.html", "company-history-change.html", "company-illegal.html", "company-mortgage-detail.html", "company-mortgage-list.html", "company-register.html", "company-search-history.html", "company-search.html", "company-shareholder-info.html", "company-stock-detail.html", "company1.html", "company2.html", "consensus-info-details.html", "consensus-info.html", "count-change.html", "create-doc-details-2.html", "create-doc-details.html", "create-doc-feedback.html", "create-doc-records.html", "create-doc-sales.html", "credit-extension-1.html", "credit-extension.html", "custom.html", "customer-sales.html", "detail-company.html", "detail-personal.html", "feedback-history.html", "feedback.html", "gold-history.html", "helper-find-company.html", "helper-find-company2.html", "helper-find.html", "helper-math.html", "helper-taxMath.html", "helper-two.html", "helper-umpire.html", "helper.html", "image-uploader.html", "important-info.html", "index-2018.html", "index.html", "lack-of-deductions.html", "listed-company.html", "listed-company1.html", "loan-task.html", "machine-manage.html", "machine.html", "market-feedback-initiate.html", "market-feedback-view.html", "market-feedback.html", "market-honor-rank.html", "market-results.html", "mine.html", "preclaim-order-detail.html", "preclaim-order-list.html", "preclaim-order.html", "prejudication.html", "product-detail.html", "product-list.html", "rank-user-view.html", "rank.html", "retail-input-CVN.html", "retail-online-send-card.html", "retail-send-card-details.html", "search-detail.html", "search-result.html", "search.html", "sensitive-customer.html", "short-icon.html", "subscribe-count.html", "task-president.html", "task-table.html", "timeout.html", "visit-company-records-1.html", "visit-company-records.html", "visit-company.html", "visit-customer.html", "visit-details.html", "visit-note.html", "visit-notice.html", "visit-records.html", "visit-state-step.html", "visit-state.html", "visit-trends.html", "visit.html", "work-daily-bank-branch.html", "work-daily-details.html", "work-daily-move.html", "work-daily-report.html", "work-daily-talk.html", "work-dynamic-group.html", "work-dynamic.html", "work-market-view-1.html", "work-market-view.html", "work-note.html", "work-team-daily.html", "work-team-leader-week.html", "work-trends.html", "work-visit-state.html", "yun-loan-location.html", "yun-loan.html", "yunloan-selection.html"]
  
    for (let i = 0; i < list.length; i++) {
      const name = list[i]
      cy.visit('/static/' + name)
      cy.wait(1300)
      cy.screenshot('./' + name.split('.')[0], {
        capture: 'fullPage'
      })
    }
  })
})
