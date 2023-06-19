import { Article } from './article';

export interface ArticleDetailsSchema {
	isLoading: boolean
	error?: string
	data?: Article
}

// "import { ${TM_FILENAME_BASE/Slice/Schema/} } from '../types/${TM_FILENAME_BASE/Slice/Schema/}';",
