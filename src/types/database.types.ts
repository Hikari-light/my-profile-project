export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          message: string
          language: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          message: string
          language: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          message?: string
          language?: string
        }
      }
      submission_limits: {
        Row: {
          id: number
          ip_address: string
          count: number
          last_submission: string
          created_at: string
        }
        Insert: {
          id?: number
          ip_address: string
          count: number
          last_submission: string
          created_at?: string
        }
        Update: {
          id?: number
          ip_address?: string
          count?: number
          last_submission?: string
          created_at?: string
        }
      }
    }
  }
} 