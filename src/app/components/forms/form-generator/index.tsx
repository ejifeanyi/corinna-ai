import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
	type: "text" | "email" | "password";
	inputType: "select" | "input" | "textarea";
	options?: { value: string; label: string; id: string }[];
	label?: string;
	placeholder: string;
	register: UseFormRegister<any>;
	name: string;
	errors: FieldErrors<FieldValues>;
	lines?: number;
	form?: string;
};

const FormGenerator = ({
	type,
	inputType,
	options,
	label,
	placeholder,
	register,
	name,
	errors,
	lines,
	form,
}: Props) => {
	switch (inputType) {
		case "input":
			return (
				<Label
					className="flex flex-col gap-2"
					htmlFor={`input-${label}`}
				>
					{label && label}
					<Input
						id={`input-${label}`}
						type={type}
						placeholder={placeholder}
						form={form}
						{...register(name)}
					/>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-red-400 mt-2">
								{message === "Required" ? "" : message}
							</p>
						)}
					/>
				</Label>
			);
		case "select":
			return (
				<Label htmlFor={`select-${label}`}>
					{label && label}
					<select
						form={form}
						id={`select-${label}`}
						{...register(name)}
					>
						{options?.length &&
							options.map((option) => (
								<option
									value={option.value}
									key={option.id}
								>
									{option.label}
								</option>
							))}
					</select>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-red-400 mt-2">
								{message === "Required" ? "" : message}
							</p>
						)}
					/>
				</Label>
			);
		case "textarea":
			return (
				<Label
					className="flex flex-col gap-2"
					htmlFor={`input-${label}`}
				>
					{label && label}
					<Textarea
						id={`input-${label}`}
						rows={lines}
						placeholder={placeholder}
						form={form}
						{...register(name)}
					/>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-red-400 mt-2">
								{message === "Required" ? "" : message}
							</p>
						)}
					/>
				</Label>
			);
		defualt: return <></>
	}
};

export default FormGenerator;
