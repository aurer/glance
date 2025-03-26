import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { coinsAtom } from "~/atoms/coinsAtom";
import { editorAtom } from "~/atoms/editorAtom";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
	coin: z.string().min(1, 'Coin name is required').toLowerCase(),
	amount: z.number({ coerce: true, message: 'Must be a number' }).min(0, 'Must be positive'),
})

type Coin = z.infer<typeof formSchema>

export function CoinForm() {
	const [editor, setEditor] = useAtom(editorAtom)
	const setCoins = useSetAtom(coinsAtom)
	const mode = editor?.index === -1 ? 'add' : 'edit'

	const form = useForm<Coin>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coin: '',
			amount: 0,
		},
	})

	const onSubmit = (data: Coin) => {
		if (mode === 'edit' && editor !== null) {
			setCoins((prevCoins) =>
				prevCoins.map((coin, index) => (index === editor.index ? data : coin))
			)
			setEditor(null)
		} else {
			setCoins((prevCoins) => [...prevCoins, data])
		}
		form.reset()
		setEditor(null)
	}

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setEditor(null)
		}
	}

	const handleDelete = () => {
		if (editor !== null) {
			setCoins((prevCoins) => prevCoins.filter((_, index) => index !== editor.index))
			setEditor(null)
		}
	}

	useEffect(() => {
		if (editor !== null) {
			form.reset(editor.coin)
		}
	}, [editor, form])

	return (
		<Dialog open={editor !== null} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === 'add' ? 'Add a Coin' : 'Edit ' + (editor?.coin.coin ?? '')}
					</DialogTitle>
					<DialogDescription>
						{mode === 'add'
							? 'Add a coin to your portfolio'
							: 'Edit the details of a coin in your portfolio'}
					</DialogDescription>
				</DialogHeader>
				{Boolean(editor) && (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="coin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Coin</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter coin name"
												{...field}
												autoComplete="off"
												autoCapitalize="none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<Input
												type="text"
												inputMode="decimal"
												placeholder="Enter amount"
												{...field}
												autoComplete="off"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<div className="flex gap-2 justify-between w-full">
									{mode === 'edit' && (
										<Button type="button" onClick={handleDelete} variant="destructive">
											Delete
										</Button>
									)}
									<Button type="submit" className="ml-auto">
										{mode === 'add' ? 'Add' : 'Save'}
									</Button>
								</div>
							</DialogFooter>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	)
} 
