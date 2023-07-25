import { RouteProps } from 'react-router-dom';

// eslint-disable-next-line neket54-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean
	role?: UserRole[]
}
