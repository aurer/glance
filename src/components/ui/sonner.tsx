"use client"

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			className="toaster group"
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--error-bg': 'var(--destructive)',
					'--error-text': 'var(--destructive-foreground)',
					'--error-border': 'var(--destructive)',
					'--success-bg': 'var(--success)',
					'--success-text': 'var(--success-foreground)',
					'--success-border': 'var(--success)',
					'--warning-bg': 'var(--warning)',
					'--warning-text': 'var(--warning-foreground)',
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }
