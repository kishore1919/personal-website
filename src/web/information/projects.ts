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
					'Infrastructure as Code (IaC) repository for managing AWS and GCP resources using Terraform best practices.',
				githubLink: 'https://github.com/kishore1919/Terraform',
				icon: {
					color: '#7B42BC',
					Component: SiTerraform,
				},
			},
			{
				name: 'ansible_homelab_setup',
				description:
					'Ansible playbook for deploying a complete homelab infrastructure on Ubuntu, featuring containerized services and KVM virtual machines.',
				githubLink: 'https://github.com/kishore1919/ansible_homelab_setup',
				icon: {
					color: '#EE0000',
					Component: SiAnsible,
				},
			},
			{
				name: 'ansible-lab-setup-with-docker',
				description:
					'Dockerized Ansible lab environment designed for learning and testing automation playbooks in a safe, isolated setting.',
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
					'Comprehensive Jenkins CI/CD pipeline implementation demonstrating automated build, test, and deployment workflows.',
				githubLink: 'https://github.com/kishore1919/jenkins-pipeline-cicd',
				icon: {
					color: '#D24939',
					Component: SiJenkins,
				},
			},
			{
				name: 'cloud_resources_cleanup_scripts',
				description:
					'Automated scripts for identifying and removing unused cloud resources across various providers to optimize costs.',
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
					'Modern, performance-focused personal portfolio website built with the Astro framework for a fast and content-driven experience.',
				githubLink: 'https://github.com/kishore1919/personal-website-astro',
				icon: {
					color: '#FF5D01',
					Component: SiAstro,
				},
			},
			{
				name: 'aws_rag_chatbot',
				description:
					'Retrieval-Augmented Generation (RAG) chatbot leveraging AWS Bedrock services to provide accurate, context-aware responses.',
				githubLink: 'https://github.com/kishore1919/aws_rag_chatbot',
				icon: {
					color: '#FF9900',
					Component: SiAmazonwebservices,
				},
			},
			{
				name: 'weather-app',
				description:
					'Responsive web-based weather application delivering real-time weather data and forecasts. Deployed via GitHub Pages.',
				githubLink: 'https://github.com/kishore1919/weather-app',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'reverse-proxy-apache2',
				description:
					'Docker-based Apache2 configuration serving as a high-performance reverse proxy for load balancing and traffic routing.',
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
					'OpenShift deployment configuration for scalable Large Language Model (LLM) applications.',
				githubLink: 'https://github.com/kishore1919/openshit-llm-deployment',
				icon: {
					color: '#6A1B9A',
					Component: BsRobot,
				},
			},
			{
				name: 'dnspython',
				description:
					'Collection of Python-based DNS utilities and tools for streamlining network operations and DNS management.',
				githubLink: 'https://github.com/kishore1919/dnspython',
				icon: {
					color: '#3776AB',
					Component: SiPython,
				},
			},
			{
				name: 'fastmcp-quickstart-20251203-56l3',
				description: 'Quickstart template for building Model Context Protocol (MCP) servers, pre-configured for rapid deployment.',
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
					'GitHub profile README showcasing my professional work, technical skills, and current interests.',
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