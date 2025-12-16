import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

type VerificationEmailProps = {
	userEmail: string;
	verificationLink: string;
};

const VerificationEmail = ({
	userEmail,
	verificationLink,
}: VerificationEmailProps) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Body className="bg-gray-100 py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] rounded-[8px] bg-white px-[40px] py-[32px] shadow-sm">
						{/* Header */}
						<Section className="mb-[32px] text-center">
							<Text className="m-0 font-bold text-[24px] text-gray-900">
								blog<span className="text-teal-600">bog</span>
							</Text>
							<Text className="m-0 mt-[8px] font-bold text-[20px] text-gray-900">
								Verify Your Email Address
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="mb-[16px] text-[16px] text-gray-700 leading-[24px]">
								Hi there,
							</Text>
							<Text className="mb-[16px] text-[16px] text-gray-700 leading-[24px]">
								Thanks for signing up with Blogbog! To complete your
								registration and secure your account, please verify your email
								address by clicking the button below.
							</Text>
							<Text className="mb-[24px] text-[16px] text-gray-700 leading-[24px]">
								This verification link will expire in 24 hours for security
								purposes.
							</Text>
						</Section>

						{/* CTA Button */}
						<Section className="mb-[32px] text-center">
							<Button
								className="box-border rounded-[8px] bg-teal-600 px-[32px] py-[16px] font-semibold text-[16px] text-white no-underline hover:bg-teal-700"
								href={verificationLink}
							>
								Verify Email Address
							</Button>
						</Section>

						{/* Alternative Link */}
						<Section className="mb-[32px]">
							<Text className="mb-[8px] text-[14px] text-gray-600 leading-[20px]">
								If the button above doesn't work, copy and paste this link into
								your browser:
							</Text>
							<Text className="break-all text-[14px] text-teal-600">
								{verificationLink}
							</Text>
						</Section>

						<Hr className="my-[24px] border-gray-200" />

						{/* Security Notice */}
						<Section className="mb-[24px]">
							<Text className="mb-[8px] text-[14px] text-gray-600 leading-[20px]">
								<strong>Security Notice:</strong>
							</Text>
							<Text className="text-[14px] text-gray-600 leading-[20px]">
								If you didn't create an account with Blogbog, please ignore this
								email. Your email address will not be added to our system.
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-gray-200 border-t pt-[24px]">
							<Text className="m-0 mb-[8px] text-[12px] text-gray-500 leading-[16px]">
								This email was sent to {userEmail}
							</Text>
							<Text className="m-0 mb-[8px] text-[12px] text-gray-500 leading-[16px]">
								Blogbog, 123 Business Street, Suite 100, City, State 12345
							</Text>
							<Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
								© {new Date().getFullYear()} Blogbog. All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerificationEmail;
