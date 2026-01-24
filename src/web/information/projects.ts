import {
	BsFillTerminalFill,
	BsBrowserChrome,
	BsCodeSlash,
	BsRobot,
	BsServer,
} from 'react-icons/bs';
import {
	SiTerraform,
	SiAnsible,
	SiDocker,
	SiJenkins,
	SiAmazonwebservices,
	SiAstro,
	SiPython,
	SiApache,
} from 'react-icons/si';

const projects = [
	{
		category: 'Infrastructure & DevOps',
		projects: [
			{
				name: 'Terraform',
				description:
					'This is my personal project about IAC with terraform on AWS And GCP.',
				githubLink: 'https://github.com/kishore1919/Terraform',
				icon: {
					color: '#7B42BC',
					Component: SiTerraform,
				},
			},
			{
				name: 'ansible_homelab_setup',
				description:
					'An Ansible playbook that deploys a complete homelab infrastructure on Ubuntu, featuring containerized services and KVM virtual machines.',
				githubLink: 'https://github.com/kishore1919/ansible_homelab_setup',
				icon: {
					color: '#EE0000',
					Component: SiAnsible,
				},
			},
			{
				name: 'ansible-lab-setup-with-docker',
				description:
					'Dockerized Ansible lab environment for learning and testing automation playbooks and configurations',
				githubLink:
					'https://github.com/kishore1919/ansible-lab-setup-with-docker',
				icon: {
					color: '#2496ED',
					Component: SiDocker,
				},
			},
			{
				name: 'jenkins-pipeline-cicd',
				description:
					'Jenkins CI/CD pipeline implementation demonstrating automated build, test, and deployment workflows',
				githubLink: 'https://github.com/kishore1919/jenkins-pipeline-cicd',
				icon: {
					color: '#D24939',
					Component: SiJenkins,
				},
			},
			{
				name: 'cloud_resources_cleanup_scripts',
				description:
					'Automated cloud resource cleanup scripts for cost optimization and resource management',
				githubLink:
					'https://github.com/kishore1919/cloud_resources_cleanup_scripts',
				icon: {
					color: '#2F393F',
					Component: BsFillTerminalFill,
				},
			},
		],
	},
	{
		category: 'Web & Cloud Applications',
		projects: [
			{
				name: 'personal-website-astro',
				description:
					'Modern personal website built with Astro framework for fast, content-focused web experiences',
				githubLink: 'https://github.com/kishore1919/personal-website-astro',
				icon: {
					color: '#FF5D01',
					Component: SiAstro,
				},
			},
			{
				name: 'aws_rag_chatbot',
				description:
					'This project is an implementation of a Retrieval-Augmented Generation (RAG) chatbot using AWS BEDROCK services. The chatbot leverages retrieval-based techniques to provide accurate and context-aware responses.',
				githubLink: 'https://github.com/kishore1919/aws_rag_chatbot',
				icon: {
					color: '#FF9900',
					Component: SiAmazonwebservices,
				},
			},
			{
				name: 'weather-app',
				description:
					'Web-based weather application with live weather data display. Deployed via GitHub Pages',
				githubLink: 'https://github.com/kishore1919/weather-app',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'reverse-proxy-apache2',
				description:
					'Docker-based Apache2 reverse proxy configuration for load balancing and routing web traffic',
				githubLink: 'https://github.com/kishore1919/reverse-proxy-apache2',
				icon: {
					color: '#D22128',
					Component: SiApache,
				},
			},
		],
	},
	{
		category: 'Experiments & Tools',
		projects: [
			{
				name: 'openshit-llm-deployment',
				description:
					'OpenShift deployment configuration for Large Language Model (LLM) applications with MIT License',
				githubLink: 'https://github.com/kishore1919/openshit-llm-deployment',
				icon: {
					color: '#6A1B9A',
					Component: BsRobot,
				},
			},
			{
				name: 'dnspython',
				description:
					'Python-based DNS utilities and tools for network operations and domain name system management',
				githubLink: 'https://github.com/kishore1919/dnspython',
				icon: {
					color: '#3776AB',
					Component: SiPython,
				},
			},
			{
				name: 'fastmcp-quickstart-20251203-56l3',
				description: 'FastMCP quickstart example - ready to deploy!',
				githubLink:
					'https://github.com/kishore1919/fastmcp-quickstart-20251203-56l3',
				icon: {
					color: '#E91E63',
					Component: BsCodeSlash,
				},
			},
			{
				name: 'kishore1919',
				description:
					'✨ Special repository - My GitHub profile README showcasing my work, skills, and interests',
				githubLink: 'https://github.com/kishore1919/kishore1919',
				icon: {
					color: '#24292E',
					Component: BsServer,
				},
			},
		],
	},
];

export default projects;