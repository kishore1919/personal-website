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
					'Infrastructure as Code project using Terraform to manage resources on AWS and GCP.',
				githubLink: 'https://github.com/kishore1919/Terraform',
				icon: {
					color: '#7B42BC',
					Component: SiTerraform,
				},
			},
			{
				name: 'Ansible Homelab Setup',
				description:
					'Automated homelab configuration and deployment using Ansible playbooks.',
				githubLink: 'https://github.com/kishore1919/ansible_homelab_setup',
				icon: {
					color: '#EE0000',
					Component: SiAnsible,
				},
			},
			{
				name: 'Ansible Lab with Docker',
				description:
					'Setting up a local Ansible laboratory environment using Docker containers.',
				githubLink: 'https://github.com/kishore1919/ansible-lab-setup-with-docker',
				icon: {
					color: '#2496ED',
					Component: SiDocker,
				},
			},
			{
				name: 'Jenkins CI/CD Pipeline',
				description:
					'End-to-end automation pipelines using Jenkins for continuous integration and delivery.',
				githubLink: 'https://github.com/kishore1919/jenkins-pipeline-cicd',
				icon: {
					color: '#D24939',
					Component: SiJenkins,
				},
			},
			{
				name: 'Cloud Cleanup Scripts',
				description:
					'Automation scripts to identify and remove unused cloud resources to save costs.',
				githubLink: 'https://github.com/kishore1919/cloud_resources_cleanup_scripts',
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
				name: 'Personal Website (Astro)',
				description:
					'My personal portfolio website built with Astro, React, and MUI.',
				githubLink: 'https://github.com/kishore1919/personal-website-astro',
				icon: {
					color: '#FF5D01',
					Component: SiAstro,
				},
			},
			{
				name: 'AWS RAG Chatbot',
				description:
					'Retrieval-Augmented Generation chatbot built on AWS with LangChain.',
				githubLink: 'https://github.com/kishore1919/aws_rag_chatbot',
				icon: {
					color: '#FF9900',
					Component: SiAmazonwebservices,
				},
			},
			{
				name: 'Weather App',
				description:
					'A responsive weather application providing real-time weather data.',
				githubLink: 'https://github.com/kishore1919/weather-app',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Apache2 Reverse Proxy',
				description:
					'Configuration and setup for Apache2 as a high-performance reverse proxy.',
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
				name: 'LLM Deployment',
				description:
					'Deploying Large Language Models at scale using OpenShift and advanced orchestration.',
				githubLink: 'https://github.com/kishore1919/openshit-llm-deployment',
				icon: {
					color: '#6A1B9A',
					Component: BsRobot,
				},
			},
			{
				name: 'DNSPython Tools',
				description:
					'Network tools and utilities built using the dnspython library for DNS management.',
				githubLink: 'https://github.com/kishore1919/dnspython',
				icon: {
					color: '#3776AB',
					Component: SiPython,
				},
			},
			{
				name: 'FastMCP Quickstart',
				description:
					'A rapid starting point for building Model Context Protocol servers.',
				githubLink: 'https://github.com/kishore1919/fastmcp-quickstart-20251203-56l3',
				icon: {
					color: '#E91E63',
					Component: BsCodeSlash,
				},
			},
			{
				name: 'Kishore1919 (Profile)',
				description:
					'My GitHub profile configuration and special landing page.',
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