export const chargebackButtonStatus:any = {
  CHARGEBACK_CUST_SUBMIT_EVIDENCE: {
    title: 'Submit Evidence',
    Open: {
      InternalDispute: {
        buttonStatus: true,
      },
      RetrievalRequest: {
        buttonStatus: true,
      },
      FirstChargeback: {
        buttonStatus: false,
      },
      SecondChargeback: {
        buttonStatus: false,
      },
      SubmitEvidence: {
        buttonStatus: false,
      },
      MissingInformation: {
        buttonStatus: true,
      },
      SentToAcquirer: {
        buttonStatus: false,
      },
      AcceptDispute: {
        buttonStatus: false,
      },
      ChallengeDispute: {
        buttonStatus: false,
      },
      LostFund: {
        buttonStatus: false,
      },
      CaseClosed: {
        buttonStatus: false,
      },
    },
    Closed: {
      buttonStatus: false,
    },
  },
  CHARGEBACK_MISSINFO: {
    title: 'Missing Information',
    Open: {
      InternalDispute: {
        buttonStatus: false,
      },
      RetrievalRequest: {
        buttonStatus: false,
      },
      FirstChargeback: {
        buttonStatus: false,
      },
      SecondChargeback: {
        buttonStatus: false,
      },
      SubmitEvidence: {
        buttonStatus: true,
      },
      MissingInformation: {
        buttonStatus: false,
      },
      SentToAcquirer: {
        buttonStatus: false,
      },
      AcceptDispute: {
        buttonStatus: false,
      },
      ChallengeDispute: {
        buttonStatus: true,
      },
      LostFund: {
        buttonStatus: false,
      },
      Reversal: {
        buttonStatus: false,
      },
      CaseClosed: {
        buttonStatus: false,
      },
    },
    Closed: {
      buttonStatus: false,
    },
  },
  CHARGEBACK_COMPLETED: {
    title: 'Case Closed',
    Open: {
      AutoRepresentment: {
        buttonStatus: true,
      },
      EvidenceUnderReview: {
        buttonStatus: true,
      },
      InternalDispute: {
        buttonStatus: false,
      },
      RetrievalRequest: {
        buttonStatus: false,
      },
      FirstChargeback: {
        buttonStatus: false,
      },
      SecondChargeback: {
        buttonStatus: false,
      },
      SubmitEvidence: {
        buttonStatus: true,
      },
      MissingInformation: {
        buttonStatus: false,
      },
      SentToAcquirer: {
        buttonStatus: false,
      },
      AcceptDispute: {
        buttonStatus: true,
      },
      ChallengeDispute: {
        buttonStatus: true,
      },
      LostFund: {
        buttonStatus: false,
      },
      Reversal: {
        buttonStatus: false,
      },
      CaseClosed: {
        buttonStatus: false,
      },
    },
    Closed: {
      buttonStatus: false,
    },
  },
  CHARGEBACK_ACCEPT_CHALLENGE_BUTTON: {
    title: 'Case Closed',
    Open: {
      InternalDispute: {
        buttonStatus: false,
      },
      RetrievalRequest: {
        buttonStatus: false,
      },
      FirstChargeback: {
        buttonStatus: true,
      },
      SecondChargeback: {
        buttonStatus: true,
      },
      SubmitEvidence: {
        buttonStatus: false,
      },
      MissingInformation: {
        buttonStatus: false,
      },
      SentToAcquirer: {
        buttonStatus: false,
      },
      AcceptDispute: {
        buttonStatus: false,
      },
      ChallengeDispute: {
        buttonStatus: false,
      },
      LostFund: {
        buttonStatus: false,
      },
      Reversal: {
        buttonStatus: false,
      },
      CaseClosed: {
        buttonStatus: false,
      },
    },
    Closed: {
      buttonStatus: false,
    },
  },
};
