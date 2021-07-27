export interface SymbolDataType {
  conversionData: {
    amount: number
    id: number
    last_updated: string
    name: string
    quote: {
      [name: string]: {
        price: number
        last_updated: string
      }
    }
    symbol: string
  }
  generalData: {
    [name: string]: {
      category: string
      date_added: string
      description: string
      id: number
      is_hidden: number
      logo: string
      name: string
      notice: string
      platform: any
      slug: string
      subreddit: string
      symbol: string
      ['tag-groups']: string[]
      ['tag-names']: string[]
      tags: string[]
      twitter_username: string
      urls: {
        announcement: string[]
        chat: string[]
        explorer: string[]
        message_board: string[]
        reddit: string[]
        source_code: string[]
        technical_doc: string[]
        twitter: string[]
        website: string[]
      }
    }
  }
}

export interface CurrencyType {
  currency: string
  exchange: number
}
