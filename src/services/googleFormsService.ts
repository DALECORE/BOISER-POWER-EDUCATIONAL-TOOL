import { getAccessToken } from '../lib/googleAuth';

export interface FormQuestionItem {
  title: string;
  type: 'TEXT' | 'CHOICE';
  options?: string[];
  required?: boolean;
}

export interface GoogleFormDetails {
  formId: string;
  info: {
    title: string;
    description?: string;
    documentTitle?: string;
  };
  responderUri?: string;
  revisionId?: string;
}

export const createGoogleForm = async (
  title: string,
  description?: string
): Promise<GoogleFormDetails> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Authentication required. Please connect your Google Account.');
  }

  const response = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title,
        description: description || 'DepEd MATATAG Standardized Student Assessment & Evaluation Form'
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to create Google Form');
  }

  return await response.json();
};

export const addQuestionsToGoogleForm = async (
  formId: string,
  questions: FormQuestionItem[]
): Promise<any> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Authentication required. Please connect your Google Account.');
  }

  const requests = questions.map((q, index) => {
    if (q.type === 'CHOICE' && q.options) {
      return {
        createItem: {
          item: {
            title: q.title,
            questionItem: {
              question: {
                required: q.required ?? true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: q.options.map((opt) => ({ value: opt }))
                }
              }
            }
          },
          location: { index }
        }
      };
    } else {
      return {
        createItem: {
          item: {
            title: q.title,
            questionItem: {
              question: {
                required: q.required ?? true,
                textQuestion: {}
              }
            }
          },
          location: { index }
        }
      };
    }
  });

  const response = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to add questions to Google Form');
  }

  return await response.json();
};

export const fetchFormResponses = async (formId: string): Promise<any> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Authentication required. Please connect your Google Account.');
  }

  const response = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to fetch Google Form responses');
  }

  return await response.json();
};
